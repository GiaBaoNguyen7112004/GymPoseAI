import * as yup from 'yup'

export const schema = yup.object({
    first_name: yup.string().trim().max(160, 'Length from 1-160 characters').required('First name is required'),
    last_name: yup.string().trim().max(160, 'Length from 6-160 characters').required('Last name is required'),
    gender: yup.string().required('Gender is required'),
    email: yup
        .string()
        .required('Email is required')
        .matches(/^\S+@\S+\.\S+$/, 'Email is not in correct format')
        .min(5, 'Length from 5-160 characters')
        .max(160, 'Length from 5-160 characters'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Length from 6-160 characters')
        .max(160, 'Length from 6-160 characters'),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password')], 'Confirmation password does not match')
        .required('Confirm password is required'),
    old_password: yup.string().required('Old password is required'),
    avatar: yup.string().trim(),

    weight: yup
        .number()
        .typeError('Weight must be a number')
        .required('Weight is required')
        .positive('Weight must be a positive number')
        .min(30, 'Weight must be at least 30 kg')
        .max(300, 'Weight must be less than 300 kg'),

    height: yup
        .number()
        .typeError('Height must be a number')
        .required('Height is required')
        .positive('Height must be a positive number')
        .min(50, 'Height must be at least 50 cm')
        .max(250, 'Height must be less than 250 cm'),

    date_of_birth: yup
        .date()
        .typeError('Date of birth must be a valid date')
        .required('Date of birth is required')
        .test('is-old-enough', 'You must be at least 13 years old', (value) => {
            if (!value) return false
            const today = new Date()
            const minAgeDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate())
            return value <= minAgeDate
        }),
    policy: yup.bool().oneOf([true], 'You must agree to the terms and conditions.').required('policy is required'),
    otp: yup
        .string()
        .required('Please enter the verification code')
        .matches(/^\d{4}$/, 'The verification code must be exactly 4 digits')
})

export const targetSchema = yup.object({
    water: yup
        .number()
        .typeError('water must be a number')
        .required('water is required')
        .positive('water must be a positive number')
        .min(0, 'water must be at least 0L')
        .max(8, 'water must be less than 8L'),

    calories: yup
        .number()
        .typeError('calories must be a number')
        .required('calories is required')
        .positive('calories must be a positive number')
        .min(0, 'calories must be at least 0Cal')
        .max(3000, 'calories must be less than 3000Cal')
})

export type TargetSchemaType = yup.InferType<typeof targetSchema>
export type SchemaType = yup.InferType<typeof schema>
