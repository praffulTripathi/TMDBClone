import { SyntheticEvent } from "react";

interface Props {
    filters: string[],
    topic: string, 
    toggleFilterActive: Function
}
function ListFilters({ filters, topic, toggleFilterActive }: Props) {
    const filterList = filters.map((filter: string, index: number) => {
        if (index === 0)
            return <li className={`scrollListFilter ${topic} isActive`} id={`${topic}-${index}`} key={`${topic}-${index}`}
                onClick={(event) => {
                    toggleFilterActive(event, `${topic}-${index}`,topic);
                }}>{filter}</li>
        else
            return <li className={`scrollListFilter ${topic}`} id={`${topic}-${index}`} key={`${topic}-${index}`}
                onClick={(event) => {
                    toggleFilterActive(event, `${topic}-${index}`,topic);
                }}>{filter}</li>
    })
    return (
        <>
            {filterList}
        </>
    )
}
export default ListFilters;