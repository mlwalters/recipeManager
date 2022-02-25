describe('login', () => {
  it('should successfully log into our app', () => {
    cy.login()
      .then((resp) => resp.body)
      .then((body) => {
        const { accessToken, expiresIn, idToken } = body;
        const auth0State = {
          nonce: '',
          state: 'some-random-state',
        };
        const callbackUrl = `/callback#access_token=${accessToken}&scope=openid&id_token=${idToken}&expires_in=${expiresIn}&token_type=Bearer&state=${auth0State.state}`;
        cy.visit(callbackUrl, {
          onBeforeLoad(win) {
            // eslint-disable-next-line no-param-reassign
            win.document.cookie = `com.auth0.auth.some-random-state=${JSON.stringify(auth0State)}`;
          },
        });
      });
  });
});
