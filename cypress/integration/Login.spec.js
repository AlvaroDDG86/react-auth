describe('Login user', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })
    it('Frontend runs', () => {
        cy.contains('Welcome on Board!')
    });
    it('User can login', () => {
        cy.contains('Login').click()
        cy.get('#email').type('alvarod5d8os@gmail.com');
        cy.get('#password').type('333333');
        cy.get('form').submit();
        cy.contains('Welcome on Board!')
    });
    
    it('User try login and fail', () => {
        cy.contains('Login').click()
        cy.get('#email').type('alvarod5d8os@gmail.com');
        cy.get('#password').type('333331');
        cy.get('form').submit();
        cy.contains('INVALID_PASSWORD')
    });
    
    it('User can logout', () => {
        cy.contains('Login').click()
        cy.get('#email').click();
        cy.get('#email').type('alvarod5d8os@gmail.com');
        cy.get('#password').click();
        cy.get('#password').type('333333');
        cy.get('form').submit();
        cy.contains('Welcome on Board!')
        cy.contains('Logout').click()
        cy.contains('Login')
    });
})