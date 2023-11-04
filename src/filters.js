export default {
    toDollarFormat: (value) => {
        if (typeof value !== "number") {
            return value;
        }
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        return formatter.format(value);
    },
    getImageLink: (filePart) => {
        console.log(filePart);
        return `${process.env.VUE_APP_API}/${filePart}`.split("\\").join('/')
    }
}