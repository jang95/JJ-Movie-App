interface TabsProps {
  title: string;
  active: string;
}

const Tabs = ({ title, active }: TabsProps) => {
  return (
    <span
      className={
        title === active
          ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
          : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
      }
    >
      {title}
    </span>
  );
};

export default Tabs;
