import React, {useState} from 'react';
import './App.css';

function App(){
  const [cards, setCards] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInput =(e)=>{
    setInputText(e.target.value);
  }

  const handleCreateCard = ()=>{
    if (inputText !== ''){
      const newCard = {id: Date.now(), text: inputText};
      setCards([...cards, newCard]);
      setInputText('');
    }
  };

  const handleDragStart = (e, index)=>{
    e.dataTransfer.setData('cardIndex', index);
  };

  const handleDragOver = (e)=>{
    e.preventDefault();
  }

  const handleDrop = (e, index) =>{
    const cardIndex = e.dataTransfer.getData('cardIndex');
    const newCards = [...cards];
    const [removedCard] = newCards.splice(cardIndex, 1);
    newCards.splice(index, 0, removedCard);
    setCards(newCards);
  };

  const handleEraseCard =(cardIndex)=>{
    const newCards = [...cards];
    newCards.splice(cardIndex, 1);
    setCards(newCards);
  }

  return(
    <div className='App'>
      <div className='input-container'>
        <input
        type="text"
        value={inputText}
        onChange={handleInput}
        placeholder="Enter text for new card..."
        />
        <button onClick={handleCreateCard}>Create Card</button>
      </div>
      <div className="card-container">
        {cards.map((card, index)=>(
          <div key={card.id} className="card" draggable onDragStart={(e)=>handleDragStart(e, index)}
          onDragOver={handleDragOver} onDrop={(e)=>handleDrop(e, index)}>{card.text}
          <button onClick={handleEraseCard}>Erase Task</button>

          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
