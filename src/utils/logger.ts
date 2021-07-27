import colors from 'colors'

export function info(message : string) {
    console.log(colors.cyan('[INFO]'), message);
}

export function error(message : string) {
    console.log(colors.red('[ERROR]'), message);
}

export function success(message : string) {
    console.log(colors.green('[SUCCESS]'), message);
}

export function auth(message : string) {
    console.log(colors.yellow('[AUTH]'), message);
}
