export default function template() {
  return `
    <h2 class="display text-2xl mb-5 text-[var(--pearl)]">File a new creature</h2>

    <label class="block mb-4 text-[var(--silver)]">
      Name
      <input type="text" class="input-name field" placeholder="The Crawling Mass" />
    </label>

    <label class="block mb-4 text-[var(--silver)]">
      Type
      <select class="input-type field">
        <option>Giant reptile</option>
        <option>Alien</option>
        <option>Mutant</option>
        <option>Giant insect</option>
        <option>Robot</option>
        <option>Deep-sea creature</option>
      </select>
    </label>

    <label class="block mb-4 text-[var(--silver)]">
      Danger level (1 to 5)
      <input type="number" min="1" max="5" class="input-danger field" placeholder="3" />
    </label>

    <label class="block mb-6 text-[var(--silver)]">
      Release year
      <input type="number" min="1950" max="1969" class="input-year field" placeholder="1957" />
    </label>

    <button class="btn-submit btn btn-lipstick w-full py-3 px-4 text-lg">Add to the archive</button>
  `
}
