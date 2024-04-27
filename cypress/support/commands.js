Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').should('be.visible').type('Wellison')
        cy.get('#lastName').should('be.visible').type('Silva')
        cy.get('#email').should('be.visible').type('wti.manutencao@gmail.com')
        cy.get('#phone').should('be.visible').type('31983161204')
        cy.get('#open-text-area').should('be.visible').type('Teste')
        cy.get('button[type="submit"]').click()
})