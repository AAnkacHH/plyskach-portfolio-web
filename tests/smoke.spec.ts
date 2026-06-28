import { test, expect } from '@playwright/test';

// Minimal smoke tests covering the critical surfaces. Aim: catch outright
// breakage (route 404, missing tile, broken lightbox), not visual regressions.

test.describe('Homepage', () => {
    for (const [path, expectedTitleSubstr] of [
        ['/', 'Mykhaylo Plyskach'],
        ['/en', 'Mykhaylo Plyskach'],
        ['/uk', 'Mykhaylo Plyskach'],
    ] as const) {
        test(`loads ${path}`, async ({ page }) => {
            await page.goto(path);
            await expect(page).toHaveTitle(new RegExp(expectedTitleSubstr));
            // The gallery teaser CTA must be present and point at the localised gallery.
            const ctaLink = page.getByRole('link', { name: /View full gallery|Zobrazit celou galerii|Переглянути всю галерею/ });
            await expect(ctaLink).toBeVisible();
            const href = await ctaLink.getAttribute('href');
            expect(href).toMatch(/\/galerie$/);
        });
    }
});

test.describe('Gallery page', () => {
    for (const path of ['/galerie', '/en/galerie', '/uk/galerie']) {
        test(`renders the photo grid at ${path}`, async ({ page }) => {
            await page.goto(path);
            const tiles = page.locator('figure.gallery-tile button');
            // Don't pin an exact count (the set grows); just guard against an
            // empty/broken grid.
            await expect(tiles.first()).toBeVisible();
            expect(await tiles.count()).toBeGreaterThanOrEqual(8);
        });
    }
});

test('Lightbox: open, navigate with arrows, close with Esc', async ({ page }) => {
    await page.goto('/galerie');

    // Open the third tile.
    await page.locator('figure.gallery-tile button').nth(2).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    // Total count is dynamic (\d+); only the running index is asserted.
    await expect(dialog).toContainText(/Nº 03 \/ \d+/);

    // ArrowRight → photo 4.
    await page.keyboard.press('ArrowRight');
    await expect(dialog).toContainText(/Nº 04 \/ \d+/);

    // ArrowLeft twice → back to photo 02.
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(dialog).toContainText(/Nº 02 \/ \d+/);

    // Esc closes.
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
});

test('SPA catch-all: unknown route redirects to /', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page).toHaveURL(/\/$/);
});
