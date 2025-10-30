// Должны быть подсвечены ошибки
import { NonExistent } from "./non-existent"; // ❌ Красная ошибка

const unusedVariable = "test"; // ❌ Предупреждение о неиспользуемой переменной

export function TestComponent() {
  const unusedLocal = "hello"; // ❌ Предупреждение о неиспользуемой переменной

  return <NonExistentComponent />; // ❌ Красная ошибка
}
