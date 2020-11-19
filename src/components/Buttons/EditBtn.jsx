
import { Link } from 'react-router-dom'

export const EditBtn = ({id}) => {
    return (
        <Link to={`/admin/editar/${id}`} >
         Administrar
        </Link>
    )
}

