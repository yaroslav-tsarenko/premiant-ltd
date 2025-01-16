interface Window {
    googleTranslateElementInit: () => void;
    google: {
        translate: {
            TranslateElement: new (options: any, element: string) => void;
        };
    };
}