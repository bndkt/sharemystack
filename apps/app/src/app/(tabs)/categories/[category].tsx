export default function Category() {
  return null;

  /* const { category: slug } = useLocalSearchParams<{ category: string }>();
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState<CategoryResponse["data"]>(null);

  useEffect(() => {
    slug &&
      getCategory({ slug }).then(({ data }) => {
        setCategory(data);
        setLoading(false);
      });
  }, [getCategory, setCategory]);

  return isLoading ? (
    <Loading />
  ) : category ? (
    <>
      <Stack.Screen
        options={{ headerShown: true, title: category.name ?? "" }}
      />
      <XStack alignItems="center" padding="$3">
        <CategoryIcon name={category.icon} width="24" height="24" />
        <YStack marginLeft="$3">
          <H2>{category.name}</H2>
        </YStack>
      </XStack>
    </>
  ) : null; */
}
