import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import Channel from './Channel';
import { PostMessageInput } from './StyledComponents/Channel.style';

const typeAndSubmitMessage = wrapper => {
  const input = wrapper.find('input[data-selector="sendMessageTextInput"]');
  input.simulate('change', { target: { value: 'Bonjour' } });
  const form = wrapper.find(PostMessageInput);
  form.simulate('submit');
};

describe('Channel', () => {
  beforeEach(() => {
    fetchMock.reset();
    fetchMock.getOnce(
      `/api/channels/1/messages?page=1`,
      {
        messages: [],
      },
      { overwriteRoutes: true }
    );
  });

  describe('when sending message', () => {
    describe('when server responds with 500', () => {
      it('should display error message', async done => {
        fetchMock.post(`/api/channels/1/messages`, 500, {
          headers: { 'Content-Type': 'application/json' },
          body: {
            contentMessage: 'Bonjour',
            channelId: 1,
          },
        });

        const wrapper = mount(<Channel channelId={1} />);
        setImmediate(() => {
          wrapper.update();
          typeAndSubmitMessage(wrapper);
          setImmediate(() => {
            wrapper.update();
            const errorMessage = wrapper.find(
              '[data-selector="error-sending-message"]'
            );
            expect(errorMessage).toHaveLength(1);
            done();
          });
        });
      });
    });

    describe("when server doesn't respond", () => {
      it('should display error message', async done => {
        fetchMock.post(
          `/api/channels/1/messages`,
          {
            throws: 'error',
          },
          {
            headers: { 'Content-Type': 'application/json' },
            body: {
              contentMessage: 'Bonjour',
              channelId: 1,
            },
          }
        );

        const wrapper = mount(<Channel channelId={1} />);
        setImmediate(() => {
          wrapper.update();
          typeAndSubmitMessage(wrapper);
          setImmediate(() => {
            wrapper.update();
            const errorMessage = wrapper.find(
              '[data-selector="error-sending-message"]'
            );
            expect(errorMessage).toHaveLength(1);
            done();
          });
        });
      });
    });
  });
  describe('Delete button', () => {
    describe('When current user is owner of the message', () => {
      let wrapper;
      beforeEach(() => {
        fetchMock.getOnce(
          `/api/channels/1/messages?page=1`,
          {
            messages: [
              {
                id: 5,
                user_id: 1,
              },
            ],
          },
          { overwriteRoutes: true }
        ); // a mock will not call fetch, it will only replace next calls by mocked value // le fetch arrive après l'appel mount du composant Channel (ligne suivante)
        fetchMock.delete(`/api/messages/5`, 200);

        wrapper = mount(<Channel channelId={1} currentUser={{ id: 1 }} />); // componentDidMount will be called after initial rendering//  1-> c'est le "mount" qui fait un réel appel cf channel l70. 2-le fetchMock l'intercept car c'est la même route et lui rend des données fictives car c'est un mock.
      });

      it('Should show delete button', async done => {
        setImmediate(() => {
          // wait for componentDidMount to update state // pour simuler un await ???
          wrapper.update(); // update rendering with new state
          const deleteButton = wrapper.find(
            'button[data-selector="message-delete-button"]'
          );
          // console.log(wrapper.debug()); // show rendered wrapper
          expect(deleteButton).toHaveLength(1);
          done();
        });
      });

      describe('When clicking on delete button', () => {
        describe('server responds with 200', () => {
          it('Deletes message on channel', done => {
            setImmediate(() => {
              wrapper.update();
              const deleteButton = wrapper.find(
                'button[data-selector="message-delete-button"]'
              );
              deleteButton.simulate('click'); //ça déclenche l'appel à la fonction deleteMessage de channel.js. et donc à la route /api/messages/5. c'est là que le 'fetchMock.delete' intercepte et renvoie une réponse 200 et donc le setState.
              setImmediate(() => {
                wrapper.update();
                const message = wrapper.find('[data-selector="message-5"]');
                expect(message).toHaveLength(0);
                done();
              });
            });
          });
        });

        describe('server does not respond', () => {
          it('Keeps message on channel', done => {
            fetchMock.delete(
              `/api/messages/5`,
              { throws: 'error' },
              { overwriteRoutes: true }
            );

            setImmediate(() => {
              wrapper.update();
              const deleteButton = wrapper.find(
                'button[data-selector="message-delete-button"]'
              );
              deleteButton.simulate('click');
              setImmediate(() => {
                wrapper.update();
                const message = wrapper.find('[data-selector="message-5"]');
                expect(message).toHaveLength(1);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('When current user is not owner of the message', () => {
    it('Should not show delete button', done => {
      fetchMock.getOnce(
        `/api/channels/1/messages?page=1`,
        {
          messages: [
            {
              id: 5,
              user_id: 2,
            },
          ],
        },
        { overwriteRoutes: true }
      );
      const wrapper = mount(<Channel channelId={1} currentUser={{ id: 1 }} />);
      setImmediate(() => {
        wrapper.update();
        const deleteButton = wrapper.find(
          'button[data-selector="message-delete-button"]'
        );
        expect(deleteButton).toHaveLength(0);
        done();
      });
    });
  });
});
