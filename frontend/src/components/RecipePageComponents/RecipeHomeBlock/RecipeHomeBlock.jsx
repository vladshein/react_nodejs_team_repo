import styles from './RecipeHomeBlock.module.css';
import SelectField from './../../common/SelectField/SelectField';
import { useState, useEffect } from 'react';

const RecipeHomeBlock = () => {
  // filters
  const [filters, setFilters] = useState({
    ingredient: '',
    area: '',
  });

  // trigger
  useEffect(() => {
    const params = new URLSearchParams(filters); // make a query
    fetch(`/api/recipe/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [filters]);

  // filter handlers
  const handleIngredient = (value) => {
    setFilters((prev) => ({
      ...prev,
      ingredient: value,
    }));
  };
  const handleArea = (value) => {
    setFilters((prev) => ({
      ...prev,
      area: value,
    }));
  };

  return (
    <section>
      <div className={styles.container}>
        <a href="#" className={styles.back}>
          ← Back
        </a>
        <h1>DESSERTS</h1>
        <p className={styles.subtitle}>
          Go on a taste journey, where every sip is a sophisticated creative chord, every dessert is
          an expression of the most refined gastronomic desires.
        </p>
        <div class={styles.layout}>
          {/* Filters */}
          <aside class={styles.filters}>
            <SelectField
              name="ingredient"
              value="0"
              onChange={handleIngredient}
              onBlur={null}
              options={[
                { value: '640c2dd963a319ea671e37aa', label: 'Squid' },
                { value: '640c2dd963a319ea671e37f5', label: 'Cabbage' },
                { value: '640c2dd963a319ea671e3665', label: 'Baking Powder' },
              ]}
              placeholder="Ingredients"
            />
            <SelectField
              name="area"
              value="0"
              onChange={handleArea}
              onBlur={null}
              options={[
                { value: '6462a6f04c3d0ddd28897f9b', label: 'Ukrainian' },
                { value: '6462a6f04c3d0ddd28897f9c', label: 'Italian' },
                { value: '6462a6f04c3d0ddd28897f9d', label: 'Moroccan' },
              ]}
              placeholder="Area"
            />
          </aside>

          {/* Cards */}
          <section class={styles.grid}>
            <article class={styles.card}>
              <img src="https://picsum.photos/400/300?1" alt="Bakewell Tart" />
              <div class={styles.cardBody}>
                <div class={styles.cardTitle}>Bakewell Tart</div>
                <div class={styles.cardDesc}>
                  To make the pastry, measure the flour into a bowl and rub in the butter with your
                  fingertips.
                </div>
                <div class={styles.cardFooter}>
                  <div class={styles.author}>
                    <img src="https://i.pravatar.cc/40?1" alt="" />
                    <span>Iveta</span>
                  </div>
                  <div class="actions">
                    <button class={styles.iconBtn}>♡</button>
                    <button class={styles.iconBtn}>↗</button>
                  </div>
                </div>
              </div>
            </article>
            {/* Repeat cards */}
            <article class={styles.card}>
              <img src="https://picsum.photos/400/300?1" alt="Bakewell Tart" />
              <div class={styles.cardBody}>
                <div class={styles.cardTitle}>Bakewell Tart</div>
                <div class={styles.cardDesc}>
                  To make the pastry, measure the flour into a bowl and rub in the butter with your
                  fingertips.
                </div>
                <div class={styles.cardFooter}>
                  <div class={styles.author}>
                    <img src="https://i.pravatar.cc/40?1" alt="" />
                    <span>Iveta</span>
                  </div>
                  <div class="actions">
                    <button class={styles.iconBtn}>♡</button>
                    <button class={styles.iconBtn}>↗</button>
                  </div>
                </div>
              </div>
            </article>
            <article class={styles.card}>
              <img src="https://picsum.photos/400/300?1" alt="Bakewell Tart" />
              <div class={styles.cardBody}>
                <div class={styles.cardTitle}>Bakewell Tart</div>
                <div class={styles.cardDesc}>
                  To make the pastry, measure the flour into a bowl and rub in the butter with your
                  fingertips.
                </div>
                <div class={styles.cardFooter}>
                  <div class={styles.author}>
                    <img src="https://i.pravatar.cc/40?1" alt="" />
                    <span>Iveta</span>
                  </div>
                  <div class="actions">
                    <button class={styles.iconBtn}>♡</button>
                    <button class={styles.iconBtn}>↗</button>
                  </div>
                </div>
              </div>
            </article>
            <article class={styles.card}>
              <img src="https://picsum.photos/400/300?1" alt="Bakewell Tart" />
              <div class={styles.cardBody}>
                <div class={styles.cardTitle}>Bakewell Tart</div>
                <div class={styles.cardDesc}>
                  To make the pastry, measure the flour into a bowl and rub in the butter with your
                  fingertips.
                </div>
                <div class={styles.cardFooter}>
                  <div class={styles.author}>
                    <img src="https://i.pravatar.cc/40?1" alt="" />
                    <span>Iveta</span>
                  </div>
                  <div class="actions">
                    <button class={styles.iconBtn}>♡</button>
                    <button class={styles.iconBtn}>↗</button>
                  </div>
                </div>
              </div>
            </article>
            <article class={styles.card}>
              <img src="https://picsum.photos/400/300?1" alt="Bakewell Tart" />
              <div class={styles.cardBody}>
                <div class={styles.cardTitle}>Bakewell Tart</div>
                <div class={styles.cardDesc}>
                  To make the pastry, measure the flour into a bowl and rub in the butter with your
                  fingertips.
                </div>
                <div class={styles.cardFooter}>
                  <div class={styles.author}>
                    <img src="https://i.pravatar.cc/40?1" alt="" />
                    <span>Iveta</span>
                  </div>
                  <div class="actions">
                    <button class={styles.iconBtn}>♡</button>
                    <button class={styles.iconBtn}>↗</button>
                  </div>
                </div>
              </div>
            </article>
            <article class={styles.card}>
              <img src="https://picsum.photos/400/300?1" alt="Bakewell Tart" />
              <div class={styles.cardBody}>
                <div class={styles.cardTitle}>Bakewell Tart</div>
                <div class={styles.cardDesc}>
                  To make the pastry, measure the flour into a bowl and rub in the butter with your
                  fingertips.
                </div>
                <div class={styles.cardFooter}>
                  <div class={styles.author}>
                    <img src="https://i.pravatar.cc/40?1" alt="" />
                    <span>Iveta</span>
                  </div>
                  <div class="actions">
                    <button class={styles.iconBtn}>♡</button>
                    <button class={styles.iconBtn}>↗</button>
                  </div>
                </div>
              </div>
            </article>
            <article class={styles.card}>
              <img src="https://picsum.photos/400/300?1" alt="Bakewell Tart" />
              <div class={styles.cardBody}>
                <div class={styles.cardTitle}>Bakewell Tart</div>
                <div class={styles.cardDesc}>
                  To make the pastry, measure the flour into a bowl and rub in the butter with your
                  fingertips.
                </div>
                <div class={styles.cardFooter}>
                  <div class={styles.author}>
                    <img src="https://i.pravatar.cc/40?1" alt="" />
                    <span>Iveta</span>
                  </div>
                  <div class="actions">
                    <button class={styles.iconBtn}>♡</button>
                    <button class={styles.iconBtn}>↗</button>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </div>
      </div>
    </section>
  );
};

export default RecipeHomeBlock;
