const { hashPassword, comparePassword } = require('../src/utils/password');

describe('Password Utility Tests', () => {

    test('should hash a password', async () => {
        const password = 'MyPassword123';

        const hash = await hashPassword(password);

        expect(hash).toBeDefined();
        expect(hash).not.toBe(password);
    });

    test('should verify the correct password', async () => {
        const password = 'MyPassword123';

        const hash = await hashPassword(password);

        const result = await comparePassword(password, hash);

        expect(result).toBe(true);
    });

    test('should reject an incorrect password', async () => {
        const password = 'MyPassword123';
        const wrongPassword = 'WrongPassword123';

        const hash = await hashPassword(password);

        const result = await comparePassword(wrongPassword, hash);

        expect(result).toBe(false);
    });

    test('should generate different hashes for the same password', async () => {
        const password = 'MyPassword123';

        const hash1 = await hashPassword(password);
        const hash2 = await hashPassword(password);

        expect(hash1).not.toBe(hash2);
    });

});