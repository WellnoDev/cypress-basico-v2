/// <reference types="Cypress"/>


describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })
    it('verifica o titulo da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });
    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste com texto grande variando a velocidade onde o Cypress executa a digitação deste texto, referente a aula1 exercicio extra.'

        cy.get('#firstName').should('be.visible').type('Wellison')
        cy.get('#lastName').should('be.visible').type('Silva')
        cy.get('#email').should('be.visible').type('wti.manutencao@gmail.com')
        cy.get('#phone').should('be.visible').type('31983161204')
        cy.get('#open-text-area').should('be.visible').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('Erro e-mail com formatação invalida', function () {
        cy.get('#firstName').should('be.visible').type('Wellison')
        cy.get('#lastName').should('be.visible').type('Silva')
        cy.get('#email').should('be.visible').type('wti.manutencao@g')
        cy.get('#phone').should('be.visible').type('31983161204')
        cy.get('#open-text-area').should('be.visible').type('texto')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('campo telefone continua vazio quando preenchido com valor não-númerico', function () {
        cy.get('#phone').type('abcdefgh').should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').should('be.visible').type('Wellison')
        cy.get('#lastName').should('be.visible').type('Silva')
        cy.get('#email').should('be.visible').type('wti.manutencao@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').should('be.visible').type('texto')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Limpando e validando so campos de digitação', function () {
        cy.get('#firstName').type('Wellison').should('have.value', 'Wellison').clear().should('have.value', '')
        cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('have.value', '')
        cy.get('#email').type('wti.manutencao@gmail.com').should('have.value', 'wti.manutencao@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('31983161204').should('have.value', '31983161204').clear().should('have.value', '')
        cy.get('#open-text-area').type('texto').should('have.value', 'texto').clear().should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product').select('youtube').should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu texto', function () {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu texto', function () {
        cy.get('#product').select('blog').should('have.value', 'blog')
    })
    it('marca o tipo de atendimento Feedback', function () {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]').should('have.length', 3).each(function ($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json').should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' }).should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile').should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr','target').click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })
    it('testa a página da política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('#title', 'CAC TAT - Política de privacidade').should('be.visible')
    })
    
});