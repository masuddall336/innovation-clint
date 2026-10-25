import { useLoaderData } from 'react-router-dom'
import Details from './Details';

const LoadData = () => {
    const product = useLoaderData();
    return (
        <Details product={product} />
    )
}

export default LoadData
