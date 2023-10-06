export const Actions = ({result}) => {
    return (
        <div className="containers flex gap-4 justify-center mt-12">
            {result?.hasPrevPage ? (
                <a href={result?.prevLink} className="py-3 rounded-lg px-8 bg-gray-200">
                    Previous
                </a>
            ) : (
                <div className="py-3 px-8 bg-gray-200 rounded-lg opacity-50 cursor-not-allowed">
                    Previous
                </div>
            )}
            {result?.hasNextPage ? (
                <a href={result?.nextLink} className="py-3 rounded-lg px-8 bg-blue-600 text-white">
                    Next
                </a>
            ) : (
                <div className="py-3 px-8 bg-gray-200 rounded-lg opacity-50 cursor-not-allowed">
                    Next
                </div>
            )}
        </div>
    )
}
