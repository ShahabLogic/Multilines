import fs from 'fs';
import path from 'path';
import { services } from './services';

describe('service directory', () => {
  test('contains thirty distinct service routes', () => {
    expect(services).toHaveLength(30);
    expect(new Set(services.map((service) => service.slug)).size).toBe(services.length);
  });

  test('uses a separate, available local image for every service', () => {
    const images = services.map((service) => service.image);
    expect(new Set(images).size).toBe(services.length);
    images.forEach((image) => {
      expect(image).toMatch(/^\/images\//);
      expect(fs.existsSync(path.resolve(__dirname, '../../public', image.slice(1)))).toBe(true);
    });
  });
});
