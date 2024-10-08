export const getYesterday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); 
    const daysToSubtract = dayOfWeek === 1 ? 2 : 1; 
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysToSubtract);
    return yesterday.toLocaleDateString('en-CA');
}

export const getRowSpan = (array, keyRowSpan, keyQuantity) => {
    const length = array.length
    
    const rowSpan = []
    const quantity = []
    let sumQuantity = 0

    for (let i = 0; i < length; i++) {
        const current = array?.[i]?.[keyRowSpan]
        const last = array?.[i - 1]?.[keyRowSpan]
        
        let count = 1
        let sum = array?.[i]?.[keyQuantity]
        sumQuantity = sumQuantity + array?.[i]?.[keyQuantity]
        
        if (current === last) {
            rowSpan.push(0)
            quantity.push(0)
            continue
        }

        for (let j = i + 1; j < array.length; j++) {
            const next = array?.[j]?.[keyRowSpan]

            if (current === next) {
                count++
                sum += array?.[j]?.[keyQuantity]
            }

            if (current !== next) break
        }
        rowSpan.push(count)
        quantity.push(sum)
    }

    return [rowSpan, quantity, sumQuantity]
}