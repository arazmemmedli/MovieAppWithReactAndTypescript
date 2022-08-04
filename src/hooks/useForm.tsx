import React, { ChangeEvent, useCallback, useState } from 'react'
import { IInitialState, IRegister } from '../types/type';

export const useForm = (initialState: IInitialState, validate: any) => {
    const [formData, setFormData] = useState<IInitialState>(initialState);

    const [errors, setErrors] = useState<IRegister>({} as IRegister);

    const setDataAndErrors = useCallback((data: IInitialState) => {
        setFormData(data);

        const errors = validate(data)

        setErrors(errors)
    }, [validate])

    const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.name) return;
        let updatedData: IInitialState = {} as IInitialState;
        if (e.target.tagName === "INPUT" && e.target.type !== 'checkbox' && e.target.type !== "file") {
            updatedData = {
                ...formData,
                [e.target.name]: {
                    ...formData[e.target.name as keyof typeof formData],
                    value: e.target.value,
                    touched: true
                }
            }
        }

        setDataAndErrors(updatedData);
    }, [setDataAndErrors, formData])

    return {
        formData, errors, changeHandler, setErrors
    }
}
