export default {
    toDollarFormat: (value) => {
        if (typeof value !== "number") {
            return value;
        }
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        return formatter.format(value);
    },
    getImageLink: (filePart) => {
        return `${process.env.VUE_APP_API}/${filePart}`.split("\\").join('/')
    }
}