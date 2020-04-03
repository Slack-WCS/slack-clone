import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import Channel from './Channel';
import { PostMessageInput } from './StyledComponents/Channel.style';
import Message from './Message';

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
});
