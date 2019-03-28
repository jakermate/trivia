import React from 'react'
import styled from 'styled-components'
import '../../css/spinner.css'

export default function Spinner(){
    return(
        <SpinnerComponent>
            <Spinner className={'loader'}>

            </Spinner>
        </SpinnerComponent>
    )
}

const SpinnerComponent = styled.div`
    margin: 0 auto;
    width: 400px;
    height: 400px;
`
