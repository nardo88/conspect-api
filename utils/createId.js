const UNMISTAKABLE_CHARS_METEOR = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz'


const choice = (string) => {
    const index = Math.floor(Math.random() * string.length)
    return string.substr(index, 1)
}

export const randomString = (charsCount, alphabet) => {
    let result = ''
    for (let i = 0; i < charsCount; i++) {
        result += choice(alphabet)
    }
    return result
}

export const createId = () => randomString(17, UNMISTAKABLE_CHARS_METEOR)