import React, {useState, useMemo} from 'react'

const UseMemo = () => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const words = ['ciao', 'ancora', 'assolutissimamente', 'io'];
  const word = words[wordIndex];

  const expensiveCount = (word) => {
    let i = 0;
    while(i < 2000000000) i++;
    return word.length;
  }

  //const letterCount = expensiveCount(word);
  const letterCount = useMemo(() => expensiveCount(word), [word])

  return (
    <div>
        <div>
            <h2>Calcola il numero di lettere (lento)</h2>
            <p>{word} ha {letterCount} lettere</p>
            <button
                onClick={() => {
                    const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1
                    setWordIndex(next)
                }}
            >Prossima</button>
        </div>
        <div>
            <h2>Incrementa il counter (veloce)</h2>
            <p>Counter: {count}</p>
            <button
                onClick={() => {
                    setCount(count + 1)
                }}
            >Incrementa</button>
        </div>
    </div>
  )
}

export default UseMemo