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
            // The 4-photo teaser CTA must be present and point at the localised gallery.
            const ctaLink = page.getByRole('link', { name: /View full gallery|Zobrazit celou galerii|Переглянути всю галерею/ });
            await expect(ctaLink).toBeVisible();
            const href = await ctaLink.getAttribute('href');
            expect(href).toMatch(/\/galerie$/);
        });
    }
});

test.describe('Gallery page', () => {
    for (const path of ['/galerie', '/en/galerie', '/uk/galerie']) {
        test(`renders 7 photos at ${path}`, async ({ page }) => {
            await page.goto(path);
            const tiles = page.locator('figure.gallery-tile button');
            await expect(tiles).toHaveCount(7);
        });
    }
});

test('Lightbox: open, navigate with arrows, close with Esc', async ({ page }) => {
    await page.goto('/galerie');

    // Open the third tile.
    await page.locator('figure.gallery-tile button').nth(2).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(/Nº 03 \/ 07/);

    // ArrowRight → photo 4.
    await page.keyboard.press('ArrowRight');
    await expect(dialog).toContainText(/Nº 04 \/ 07/);

    // ArrowLeft twice → wrap-around to photo 02.
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(dialog).toContainText(/Nº 02 \/ 07/);

    // Esc closes.
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
});

test('SPA catch-all: unknown route redirects to /', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page).toHaveURL(/\/$/);
});
