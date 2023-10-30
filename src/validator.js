import {helpers, required} from '@vuelidate/validators';

export const required$ = helpers.withMessage('This field is required', required)
