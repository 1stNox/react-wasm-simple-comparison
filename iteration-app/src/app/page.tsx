import { sum } from "../lib/wasm";

export default async function Home() {
  function sumLargeArray(numbers: Int32Array): number {
    return numbers.reduce((acc, x) => acc + x);
  }

  function executeCalc(): number {
    let start = new Date();
    console.time("sumLargeArray in Vanilla JS");
    console.log(sumLargeArray(new Int32Array(1e6).fill(1)));
    console.timeEnd("sumLargeArray in Vanilla JS");
    let end = new Date();

    return end.getTime() - start.getTime();
  }

  function executeWasm(): number {
    let start = new Date();
    console.time("wasm");
    console.log(sum(new Int32Array(1e6).fill(1)));
    console.timeEnd("wasm");
    let end = new Date();

    return end.getTime() - start.getTime();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-24">
      <div className="flex justify-between items-center w-96 h-32">
        <p>Vanilla: {`${executeCalc()}ms`}</p>
        <p>WASM: {`${executeWasm()}ms`}</p>
      </div>
    </main>
  );
}
