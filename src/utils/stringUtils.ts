interface IStringUtils {
    capitalize: (s: string) => string;
}

class StringUtils implements IStringUtils {
    public capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);
}

export const stringUtils = new StringUtils();
