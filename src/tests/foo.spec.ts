import User from 'src/utils/user'

test('it should be ok', () => {
    const user = new User();
    user. email = 'joao@gmail.com';

    expect(user.email).toEqual('joao@gmail.com')
})