const stringToNumber = (text): number => {
    return !isNaN(text) ? parseInt(text, 10) : 0;
};

const { SECRET, EXPIRY_TIME_MINUTES } = process.env;
const expiresInMinutes: number = stringToNumber(EXPIRY_TIME_MINUTES) || 10;

export const auth = {
    secret: SECRET || 'fakesecret',
    expiresIn: 60 * (expiresInMinutes as number)
};

export const defaultOptions = {
    session: false,
    property: 'user'
};
