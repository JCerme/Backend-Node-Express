export const Cards = () => {
    return (
        <div className="flex no-wrap justify-between gap-4 mt-4">
            <div className="flex flex-1 flex-col text-center leading-5 gap-2 px-8 py-4 rounded-lg bg-gray-100 border text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512"><path d="M50.7 58.5L0 160H208V32H93.7C75.5 32 58.9 42.3 50.7 58.5zM240 160H448L397.3 58.5C389.1 42.3 372.5 32 354.3 32H240V160zm208 32H0V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192z" fill="#2563eb"/></svg>
                <p>Fast Shipping</p>
            </div>
            <div className="flex flex-1 flex-col text-center leading-5 gap-2 px-8 py-4 rounded-lg bg-gray-100 border text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 640 512"><path d="M640 0V400c0 61.9-50.1 112-112 112c-61 0-110.5-48.7-112-109.3L48.4 502.9c-17.1 4.6-34.6-5.4-39.3-22.5s5.4-34.6 22.5-39.3L352 353.8V64c0-35.3 28.7-64 64-64H640zM576 400a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM23.1 207.7c-4.6-17.1 5.6-34.6 22.6-39.2l46.4-12.4 20.7 77.3c2.3 8.5 11.1 13.6 19.6 11.3l30.9-8.3c8.5-2.3 13.6-11.1 11.3-19.6l-20.7-77.3 46.4-12.4c17.1-4.6 34.6 5.6 39.2 22.6l41.4 154.5c4.6 17.1-5.6 34.6-22.6 39.2L103.7 384.9c-17.1 4.6-34.6-5.6-39.2-22.6L23.1 207.7z" fill="#2563eb"/></svg>
                <p>Easy Returns</p>
            </div>
            <div className="flex flex-1 flex-col text-center leading-5 gap-2 px-8 py-4 rounded-lg bg-gray-100 border text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z" fill="#2563eb"/></svg>
                <p>Secure Payments</p>
            </div>
        </div>
    )
}
