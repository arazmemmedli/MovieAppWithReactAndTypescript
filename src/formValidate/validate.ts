import { IRegister } from "../types/type";

const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default (fields: any, submit = false) => {
    let errors: IRegister = {} as IRegister;

    for (let field in fields) {
        if (submit) {
            fields[field].touched = true;
        }

        const currentField = fields[field];

        if (currentField.required && (currentField.value === '' || !currentField.value) && currentField.touched) {
            errors[field as keyof typeof errors] = currentField.requiredMessage ? currentField.requiredMessage : 'This field is required!';
        }

        if (currentField.file && currentField.required && Object.keys(currentField.value).length === 0 && currentField.touched) {
            errors[field as keyof typeof errors] = currentField.requiredMessage ? currentField.requiredMessage : 'This field is required!';
        }

        if (!errors[field as keyof typeof errors] && currentField.email && !validateEmail(currentField.value) && currentField.touched) {
            errors[field as keyof typeof errors] = currentField.emailMessage ? currentField.emailMessage : 'Invalid email address!';
        }

        if (!errors[field as keyof typeof errors] && currentField.matchWith && currentField.value !== fields[currentField.matchWith].value && currentField.touched) {
            errors[field as keyof typeof errors] = currentField.matchWithMessage ? currentField.matchWithMessage : 'Fields values are not equal!';
        }

        if (!errors[field as keyof typeof errors] && currentField.minLength && currentField.value !== '' && currentField.value.length < currentField.minLength && currentField.touched) {
            errors[field as keyof typeof errors] = currentField.minLengthMessage ? currentField.minLengthMessage : `This field must have at least ${currentField.minLength} characters`;
        }

        if (!errors[field as keyof typeof errors] && currentField.maxLength && currentField.value !== '' && currentField.value.length > currentField.maxLength && currentField.touched) {
            errors[field as keyof typeof errors] = currentField.maxLengthMessage ? currentField.maxLengthMessage : `This field must have less than ${currentField.maxLength} characters`;
        }

        if (!errors[field as keyof typeof errors] && currentField.file && currentField.touched && currentField.allowedTypes && !currentField.allowedTypes.includes(currentField.value[0].type.split('/')[1])) {
            errors[field as keyof typeof errors] = currentField.allowedTypesMessage ? currentField.allowedTypesMessage : 'Invalid file type!';
        }

        if (!errors[field as keyof typeof errors] && currentField.file && currentField.touched && currentField.maxFileSize && (currentField.maxFileSize * 1024) < Math.round(currentField.value[0].size)) {
            errors[field as keyof typeof errors] = currentField.maxFileSizeMessage ? currentField.maxFileSizeMessage : `File is too large(${Math.round(currentField.value[0].size / 1024)}KB), it cannot be larger than ${currentField.maxFileSize}KB`;
        }
    }

    return errors;
}