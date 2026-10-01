export default function template() {
  return `
    <div class="flex flex-wrap justify-between items-baseline gap-2 mb-5">
      <h2 class="display text-2xl">The archive</h2>
      <p class="text-[var(--silver)]">
        Creatures on file :
        <span class="monster-count display text-2xl text-[var(--gold)]">0</span>
      </p>
    </div>

    <input type="search" class="input-search field mb-5" placeholder="Search by name or type" />

    <div class="overflow-x-auto">
      <table class="monsters-table w-full">
        <thead>
          <tr>
            <th class="text-left p-3"><a href="#" data-sort="name">Name</a></th>
            <th class="text-left p-3"><a href="#" data-sort="type">Type</a></th>
            <th class="text-left p-3"><a href="#" data-sort="dangerLevel">Danger</a></th>
            <th class="text-left p-3"><a href="#" data-sort="year">Year</a></th>
            <th class="text-right p-3">Actions</th>
          </tr>
        </thead>
        <tbody class="monster-list"></tbody>
      </table>
    </div>
  `;
}
