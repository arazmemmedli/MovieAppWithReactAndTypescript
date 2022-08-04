import React from 'react'

export const Input = (props: any) => {
    return (
        <>
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                {props.label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input aria-label={props.placeholder} type={props.type || "text"} value={props.value} name={props.name} id={props.id} placeholder={props.placeholder} onChange={props.onChange} className={`text-sm outline-none text-gray-base w-full mr-3 py-5 px-4 h-2 border ${props.error ? "border-red-600" : "border-gray-primary"} border-solid rounded mb-2`} />
            </div>
            {props.error && <p className='text-red-600 text-sm'>{props.error}</p>}
        </>
    )
}
