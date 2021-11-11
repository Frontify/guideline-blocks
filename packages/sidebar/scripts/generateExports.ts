import fastGlob from 'fast-glob';
import { dirname, join, sep } from 'path';
import { writeFile } from 'fs/promises';

(async () => {
    const componentsFilePath = await fastGlob(['src/components/**/index.ts']);
    const componentsFileParentDirPath = componentsFilePath.map((cfp) => dirname(cfp));
    const sortedComponentsFileParentDirPath = componentsFileParentDirPath.sort((a, b) => a.localeCompare(b));

    const componentsFileParentDirPathAndName = sortedComponentsFileParentDirPath.map((cfp) => {
        const pathSplit = cfp.split(sep);
        return {
            name: pathSplit[pathSplit.length - 1],
            path: cfp,
        };
    });

    const componentExportLine = (component: { name: string; path: string }) => {
        return `export { ${component.name} } from './${component.path.replace('src/', '')}';`;
    };

    const fileContent = `import 'tailwindcss/tailwind.css';\n${componentsFileParentDirPathAndName
        .map(componentExportLine)
        .join('\n')}
    `;

    console.log(fileContent);

    writeFile(join(__dirname, '..', 'src', 'index.ts'), fileContent, { encoding: 'utf8' });
})();
