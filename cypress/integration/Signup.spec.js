describe('Login user', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })
    
    it('User try signup and fail for weak password', () => {
        cy.contains('Login').click()
        cy.contains('Create new account').click()
        cy.get('#email').type('alvarod5d8os@gmail.com');
        cy.get('#password').type('3');
        cy.get('form').submit();
        cy.contains('WEAK_PASSWORD')
    });
    
    it('User try signup and fail for email exists', () => {
        cy.contains('Login').click()
        cy.contains('Create new account').click()
        cy.get('#email').type('alvarod5d8os@gmail.com');
        cy.get('#password').type('3222222');
        cy.get('form').submit();
        cy.contains('EMAIL_EXISTS')
    });
})