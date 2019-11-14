import React from 'react';
import {
  SearchChannelBloc,
  ButtonSearchChannel,
  ModalContainer,
  ModalSearchChannel,
  SearchForm,
  ChannelSearchInput,
  SearchChannelList,
  SearchChannelListElements,
  ShortcutsList,
  ShortcutsListElements,
} from '../StyledComponents/SearchBar.style';

const SearchBar = () => {
  return (
    <div>
      <SearchChannelBloc>
        <ButtonSearchChannel
          type="button"
          data-toggle="modal"
          data-target=".search-modal"
        >
          Search your channel{' '}
        </ButtonSearchChannel>
      </SearchChannelBloc>
      <div>
        <div
          className="modal fade search-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <ModalContainer className="modal-dialog modal-lg">
            <ModalSearchChannel className="modal-content ">
              <SearchForm>
                <ChannelSearchInput
                  className="global-input"
                  type="search"
                  placeholder="Search your channel..."
                />
              </SearchForm>
              <div>
                <SearchChannelList>
                  <SearchChannelListElements>
                    Un premier channel
                  </SearchChannelListElements>
                  <SearchChannelListElements>
                    Un second channel
                  </SearchChannelListElements>
                  <SearchChannelListElements>
                    Un troisième channel
                  </SearchChannelListElements>
                </SearchChannelList>
              </div>
              <div>
                <ShortcutsList>
                  <ShortcutsListElements>
                    Un premier raccourci
                  </ShortcutsListElements>
                  <ShortcutsListElements>
                    Un second raccourci
                  </ShortcutsListElements>
                  <ShortcutsListElements>
                    Un troisième raccourci
                  </ShortcutsListElements>
                </ShortcutsList>
              </div>
            </ModalSearchChannel>
          </ModalContainer>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
