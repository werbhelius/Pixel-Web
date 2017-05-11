export const logger = (tag, message) => {
    if (typeof message == 'object') {
        console.log(tag + ":" + JSON.stringify(message));
    } else {
        console.log(tag + ":" + message);
    }
}