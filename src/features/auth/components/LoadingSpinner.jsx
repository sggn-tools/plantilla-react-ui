import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoading } from '../../ui/uiSelectors'

const LoadingSpinner = () => {

    const isLoading = useSelector(selectIsLoading)

    if (!isLoading) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}
        >
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    )
}

export default LoadingSpinner