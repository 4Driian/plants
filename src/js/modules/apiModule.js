export async function getInventory(productType, itemId) {
  try {
    const response = await fetch(
      `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/inventory/${productType}/${itemId}`
    );
    const data = await response.json();
    return {
      name: itemId,
      inventory: data.stock || 0,
    };
  } catch (error) {
    console.error(`Error fetching ${productType} inventory:`, error);
    return {
      name: itemId,
      inventory: 0,
    };
  }
}

export async function getDetails(plantName) {
  try {
    const response = await fetch(
      `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/info/${plantName}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching plant details:', error);
    return null;
  }
}
