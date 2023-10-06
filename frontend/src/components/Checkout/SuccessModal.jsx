import React from 'react'

export const SuccessModal = ({state, setModal}) => {
    return (
        <div id="modal" className={(state ? "active " : "") + "w-full h-full fixed flex jusitfy-center items-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 backdrop-blur-lg"}>
            <div className='modal p-20 relative shadow-lg bg-white max-w-2xl w-1/2 h-1/2 mx-auto flex flex-col justify-center items-center rounded-xl'>
                <span onClick={() => setModal(false)}
                className='cursor-pointer absolute top-4 right-4 text-white w-8 h-8 rounded-full text-xl bg-red-600 flex justify-center items-center'>
                    x
                </span>
                [icon]
                <h2 className='text-green-600 text-4xl font-thin mb-12'>
                    Congratulations!
                </h2>
                <p className='text-gray-600 text-center font-thin'>
                    Your order has been completed successfully. On your mail, you can find the bill and a summary of the order.
                    <br/>
                    See you soon! ;D
                </p>
            </div>
        </div>
    )
}
