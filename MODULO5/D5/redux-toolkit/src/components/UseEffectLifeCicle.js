import React, {useState, useEffect} from 'react'

const UseEffectLifeCicle = () => {
    const [count, setCount] = useState(0);

    //componentDidMount
    useEffect(() => {
        console.log('componentDidMount')

        return () => {
            console.log('componentWillUnmount');
        }
    }, [])

    //componentDidUpdate
    useEffect(() => {
        console.log('componentDidMount')

        return () => {
            console.log('componentWillUnmount');
        }
    }, [count])

  return (
    <div>UseEffectLifeCicle</div>
  )
}

export default UseEffectLifeCicle