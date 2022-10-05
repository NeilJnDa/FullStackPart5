const NewBlogForm = (props) =>{
    const hideWhenVisible = {display: props.newBlogVisible ? 'none': ''}
    const showWhenVisible = {display: props.newBlogVisible ? '': 'none'}

    return(
        <div>
            <div style = {hideWhenVisible}>
                <button onClick={()=> props.setNewBlogVisible(true)}>Create New</button>
            </div>
            <div style = {showWhenVisible}>
                <h2>Create New</h2>
                <form onSubmit={props.handleCreateNew}>
                <div>
                    Title:
                    <input
                    name = "Title"
                    type="text"
                    value={props.newTitle}
                    onChange = {({target}) => props.setNewTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input
                    name = "Author"
                    type="text"
                    value={props.newAuthor}
                    onChange = {({target}) => props.setNewAuthor(target.value)}
                    />
                </div>
                <div>
                    Url:
                    <input
                    name = "Url"
                    type="text"
                    value={props.newUrl}
                    onChange = {({target}) => props.setNewUrl(target.value)}
                    />
                </div>
                    <button type="submit">Create</button>
                </form>
                <button onClick={() => props.setNewBlogVisible(false)}>Cancel</button>
            </div>
        </div>
    )
}
export default NewBlogForm