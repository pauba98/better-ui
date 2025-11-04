export const mergeClasses = (classes: (string | undefined | null)[]) => {
    return classes.filter(c => Boolean(c)).join(' ')
}


export function getOrCreatePortalRoot(id: string) {
    let root = document.getElementById(id);
    if (!root) {
        root = document.createElement("div");
        root.id = id;
        // root.style.zIndex = '1000';
        document.body.appendChild(root);
    }
    return root;
}