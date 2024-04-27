Cypress._.times(5, function(){
    it('testa a página da política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('#title', 'CAC TAT - Política de privacidade').should('be.visible')
    })
})