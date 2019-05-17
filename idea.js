class Idea {
  constructor({id, title, body, quality, fave}){
    this.id = id,
    this.title = title,
    this.body = body,
    this.quality = quality,
    this.fave = fave
  }

  saveToLocal(cards){
    localStorage.setItem('cards', JSON.stringify(cards))
  }

  deleteFromLocal(id, cards){
    let filteredCards = cards.filter(card => card.id !== id);
    this.saveToLocal(filteredCards);
  }

  updateQuality(card, update){
    this.quality = update;
    this.saveToLocal(cards)
  }
}