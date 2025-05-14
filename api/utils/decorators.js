function logExecutionTime(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = async function(...args) {
    const start = Date.now();
    const result = await originalMethod.apply(this, args);
    const end = Date.now();
    
    console.log(`Method ${propertyKey} executed in ${end - start}ms`);
    return result;
  };
  
  return descriptor;
}

module.exports = { logExecutionTime };