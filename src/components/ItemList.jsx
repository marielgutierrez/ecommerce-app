import Item from './Item'

const ItemList = ({ productos }) => {
  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', padding: '20px' }}>
      {
        productos.map(prod => (
          <Item key={prod.id} {...prod} />
        ))
      }
    </div>
  )
}

export default ItemList
