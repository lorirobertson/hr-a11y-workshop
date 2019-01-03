beforeEach(function () {
    var user = JSON.stringify({
        id: '123456',
        username: 'test',
        email: 'test@test.com',
        fullName: 'Test Testington',
        dob: '11-06-1988',
        address: '123 Test Rd.',
        address2: '',
        city: 'Test',
        state: 'TS',
        zip: '12345',
        country: 'Test',
        position: 'Tester'
    });
    
    localStorage.setItem('user', user);
});