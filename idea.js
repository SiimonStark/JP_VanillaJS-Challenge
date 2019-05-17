class Idea {
  constructor({id, title, body, quality}){
    this.id = id,
    this.title = title,
    this.body = body,
    this.quality = quality
  }

  saveToLocal(cards){
    localStorage.setItem('cards', JSON.stringify(cards))
  }

  deleteFromLocal(cards){
    cards.splice(index, 1)
    this.saveToLocal(cards)
  }

  updateQuality(card, update){
    this.quality = update;
    this.saveToLocal(cards)
  }
}